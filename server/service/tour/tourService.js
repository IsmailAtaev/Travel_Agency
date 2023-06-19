const { ObjectId } = require("mongodb");
const TourModel = require("../../models/tour/tourModel");
const { onlineTicket } = require("../pdf/pdfTicket");
const mailService = require("../mail/mailService");
const { nanoid } = require("nanoid");
const CardValidationId = require("../../models/validCardId/validateCardId");
const BookingModel = require("../../models/booking/bookingModel");
const UserModel = require("../../models/user/userModel");
const TicketNoUserModel = require("../../models/ticketNoUser/ticketNoUser");
const TicketModel = require("../../models/ticket/ticketModel");
const bookingModel = require("../../models/booking/bookingModel");

// const fs = require("fs");
// const PDFDocument = require("pdfkit");

class TourService {
  async getAllTours() {
    const tours = await TourModel.find({ flag: true }); //{flag: true}
    return tours;
  }

  async createTour(
    name,
    type,
    date,
    country,
    city,
    price,
    duration,
    linkPhoto
  ) {
    const tour = await TourModel.create({
      name,
      type,
      date,
      country,
      city,
      price,
      duration,
      flag: true,
      linkPhoto,
    });
    return tour;
  }

  async delete(id) {
    //const removedTour = await TourModel.deleteOne({ _id: id });
    const removedTour = await TourModel.updateOne(
      { _id: id },
      { $set: { flag: false } }
    );
    console.log("removedTour ", removedTour);
    return removedTour;
  }

  async validateIdCard(email) {
    let ID = nanoid(4);
    const cardValid = await CardValidationId.create({
      validateCard: ID,
      email: email,
    });
    mailService.sendValidateCard(email, ID);
    return cardValid;
  }

  async buyTour(objInfoBuyTour) {
    // console.log("============================================================");
    // console.log("objInfoBuyTour: ", objInfoBuyTour);
    // console.log("============================================================");

    const { customers, mainClient, tour } = objInfoBuyTour;

    const cardValidation = await CardValidationId.findOne({
      email: mainClient.email,
      validateCard: mainClient.codeId,
    });

    if (!cardValidation) {
      return { elem: "not found code or email" };
    }

    const totalCost = customers.length * tour.price;
    const reys = tour.country[0] + tour.city[0] + tour.duration;
    const time = "03:00";

    const pathName = `C:/Users/admin/Desktop/diplom/server/pdf/${mainClient.firstName}.pdf`;
    console.log("pathName: ", pathName);

    let items = [];
    for (let i = 0; i < customers.length; i++) {
      items.push({
        item: customers[i].firstName + " " + customers[i].lastName,
        description: customers[i].passportSeriesAndNumber,
        quantity: time,
        amount: reys,
        // cost: tour.price,
      });
    }

    const invoice = {
      shipping: {
        name: tour.name,
        address: tour.duration + " " + tour.type + " " + tour.date,
        city: tour.city,
        state: tour.country,
        country: " ",
        postal_code: "94111",
      },
      items,
      // items: [
      //   {
      //     item: "TC 100",
      //     description: "Toner Cartridge",
      //     quantity: 2,
      //     amount: 6000,
      //   },
      //   {
      //     item: "USB_EXT",
      //     description: "USB Cable Extender",
      //     quantity: 1,
      //     amount: 2000,
      //   },
      // ],
      subtotal: "8000",
      paid: totalCost,
      invoice_nr: totalCost,
    };

    onlineTicket(invoice, pathName);

    try {
      const createTicketNoUser = await TicketNoUserModel.create({
        tourId: tour._id,
        firstName: mainClient.firstName,
        lastName: mainClient.lastName,
        email: mainClient.email,
        phoneNumber: mainClient.phoneNumber,
        cardNumber: mainClient.cardNumber,
        cardId: mainClient.codeId,
        paid: totalCost,
        clock: time,
        flight: reys,
        pathName,
        customers,
        flag: true,
      });
    } catch (error) {
      console.log(error);
    }

    mailService.sendTicket(pathName, mainClient.firstName, mainClient.email);

    const cardValidationDelete = await CardValidationId.deleteOne({
      email: mainClient.email,
      validateCard: mainClient.codeId,
    });

    return { elem: "vse super " };
  }

  /** Booking Service */
  async reservationTour(objInfoBuyTour) {
    const { customers, mainClient, tour, card } = objInfoBuyTour;

    const tourModel = await TourModel.findOne({
      _id: tour._id,
      country: tour.country,
    });
    if (!tourModel) {
      return { elem: "нету такого тура" };
    }

    const userModel = await UserModel.findOne({
      _id: mainClient.id,
      email: mainClient.email,
    });
    if (!userModel) {
      return { elem: "нету такого пользователя" };
    }

    const cardValidationModel = await CardValidationId.findOne({
      email: mainClient.email,
      validateCard: card.codeId,
    });
    if (!cardValidationModel) {
      return { elem: "Неверный код подтверждение" };
    }

    const cost = tour.price * customers.length;
    const pay = 30 * (cost / 100);
    const needToPay = cost - pay;

    const btm = await BookingModel.create({
      user: userModel._id,
      tour: tourModel._id,
      pay,
      needToPay,
      price: cost,
      customers,
    });

    const cardValidationRemove = await CardValidationId.deleteOne({
      email: mainClient.email,
      validateCard: card.codeId,
    });

    return { booking: "Тур успешно забронирован" };
  }

  async getReservationTour(user) {
    const userModel = await UserModel.findOne({
      _id: user.id,
      email: user.email,
    });
    if (!userModel) {
      return { elem: "Нету такого пользователя" };
    }

    if (user.role === "USER") {
      console.log(userModel);
      const id = userModel._id;

      const getBooking1 = await BookingModel.find({ user: id });
      // const getBookingUser = await BookingModel.find({ user: userModel._id });
      //console.log(getBooking1);
      // console.log("getBookingUser ", getBooking1);
      let arr = [];
      for (let i = 0; i < getBooking1.length; i++) {
        const tourInfo = await TourModel.findOne({ _id: getBooking1[i].tour });
        const bookingInfo = getBooking1[i];
        arr.push({ bookingInfo, tourInfo, userInfo: userModel });
      }
      //console.log(arr);
      return arr;
    }
    /*
    console.log("== ", getBookingUser[0].user);
    console.log("=+  ", typeof getBookingUser[0].user);

       getBooking[1].user = {};
         getBooking[1].user = { ...userBooking };

    const result1 = getBookingUser.map(async (elem) => {
      const tourInfo = await TourModel.findOne({ _id: elem.tour });
      console.log("===========================================");
      console.log("tour: ", tourInfo);
      console.log("===========================================");

      const userBooking = await UserModel.findOne({ _id: elem.user });
      console.log("===========================================");
      console.log("user: ", userBooking);
      console.log("===========================================");

      return { ...tourInfo, userInfo: { ...userBooking } };
    });
    console.log("result1: ", result1);

    /

    const userBooking = await UserModel.findOne({ _id:  });
    console.log("userBooking: ", userBooking);

    const result = getBookingUser.map((elem) => {
      const tourId = JSON.stringify(elem.tour);
      console.log("tourId: ", tourId);
      console.log("tourId: ", typeof tourId);
      console.log("tourId: ", JSON.stringify(tourId));
      const tourInfo = await TourModel.findOne({ _id: elem.tour });
      console.log("=DB=");
      console.log("===========================================");
      console.log("tour: ", tourInfo);
      console.log("===========================================");

      console.log("=DB=");
      console.log("===========================================");
      console.log("user: ", userBooking);
      console.log("===========================================");
      console.log("elem: ", elem);
      console.log("elem: ", Object.assign(elem, userBooking));
      let e = {}
      let e = { elem, ...userBooking._doc };
      return e;
      { elem, ...userBooking._doc };
      elem.user = { ...userBooking };
      console.log(typeof elem.user);
      console.log(elem.user);

      elem = { elem, userInfo: { ...userBooking._doc } };
      return elem;
    });

    console.log("result: ", result);
*/

    const getBooking = await BookingModel.find();
    let arrAdmin = [];
    for (let i = 0; i < getBooking.length; i++) {
      const tourInfo = await TourModel.findOne({ _id: getBooking[i].tour });
      const userInfo = await UserModel.findOne({ _id: getBooking[i].user });
      const bookingInfo = getBooking[i];
      arrAdmin.push({ bookingInfo, tourInfo, userInfo });
    }
    return arrAdmin;
  }

  async buyTourValidUser(bookingInfoValidUser) {
    const invoice = {
      shipping: {
        name: "John Doe",
        address: "1234 Main Street",
        city: "San Francisco",
        state: "CA",
        country: "US",
        postal_code: 94111,
      },
      items: [
        {
          item: "TC 100",
          description: "Toner Cartridge",
          quantity: 2,
          amount: 6000,
        },
        {
          item: "USB_EXT",
          description: "USB Cable Extender",
          quantity: 1,
          amount: 2000,
        },
      ],
      subtotal: 8000,
      paid: 0,
      invoice_nr: 1234,
    };

    const { bookingInfo, tourInfo, userInfo, card } = bookingInfoValidUser;
    console.log("bookingInfo: ", bookingInfo);

    const tourModel = await TourModel.findOne({ _id: tourInfo._id });
    if (!tourModel) {
      return { elem: "нету такого тура" };
    }

    const userModel = await UserModel.findOne({
      _id: userInfo._id,
      email: userInfo.email,
    });
    if (!userModel) {
      return { elem: "нету такого пользователя" };
    }

    const bookingModelTicket = await BookingModel.findOne({
      _id: bookingInfo._id,
    });
    if (!bookingModelTicket) {
      return { elem: "нету такого забронированного тура" };
    }

    const cardValidId = await CardValidationId.findOne({
      email: userInfo.email,
      validateCard: card.codeId,
    });
    if (cardValidId !== null) {
      const cardValidationDelete = await CardValidationId.deleteOne({
        email: userInfo.email,
        validateCard: card.codeId,
      });
      console.log("cardValidationDelete ", cardValidationDelete);
    } else {
      return {
        elem: "неверный код валидация карты введеите то что отправили на почту",
      };
    }
    const bookingModelDelete = await BookingModel.deleteOne({
      _id: bookingInfo._id,
    });

    // console.log("*******************************************************");
    // console.log("bookingModelDelete ", bookingModelDelete);
    // console.log("*******************************************************");

    const folder = userInfo.nickName + Date.now();
    const reys = tourInfo.country[0] + tourInfo.city[0] + tourInfo.duration;
    const directory = `C:/Users/admin/Desktop/diplom/server/pdf/${folder}.pdf`;

    const createTicket = await TicketModel.create({
      userId: userInfo._id,
      tourId: tourInfo._id,
      email: userInfo.email,
      cardNumber: card.cardNumber,
      cardId: card.codeId,
      paid: bookingInfo.price,
      clock: "04:00",
      flight: reys,
      pathName: directory,
      customers: bookingInfo.customers,
      flag: true,
    });

    onlineTicket(invoice, directory);
    mailService.sendTicket(directory, userInfo.nickName, userInfo.email);

    return "тур куплен";
  }

  async cancelBookingTour(cancelTourObj) {
    const { userId, tourId, bookingId } = cancelTourObj;
    const bookingModelDelete = await BookingModel.deleteOne({
      _id: bookingId,
      user: userId,
      tour: tourId,
    });
    return { elem: "тур успешно отменен" };
  }

  /** Ticket Service */

  async getValidUserTicket(objUserTicket) {
    //console.log("objUserTicket: ", objUserTicket);
    const tickets = await TicketModel.find({
      userId: objUserTicket.userId,
      email: objUserTicket.email,
    });

    const toursId = tickets.map((elem) => elem.tourId);
    const tours = await TourModel.find({ _id: { $in: toursId } });

    const resultTickets = [];

    for (let i = 0; i < tickets.length; i++) {
      for (let j = 0; j < tours.length; j++) {
        if (
          JSON.stringify(tickets[i].tourId) === JSON.stringify(tours[j]._id)
        ) {
          tickets[i].tourId = tours[j];
          resultTickets.push(tickets[i]);
          break;
        }
      }
    }
    return resultTickets;
  }

  async getTickets() {
    let arrTicket = [];
    const ticketValidUser = await TicketModel.find()
      .populate("userId")
      .populate("tourId")
      .then((objArr) => (arrTicket = { ...objArr }))
      .catch((err) => console.log(err));

    let arrNoUserTicket = [];
    const ticketNoUser = await TicketNoUserModel.find()
      .populate("tourId")
      .then((objArrNoUser) => (arrNoUserTicket = { ...objArrNoUser }))
      .catch((err) => console.log(err));

    if (arrTicket.length !== 0 && arrNoUserTicket.length !== 0) {
      return { arrTicket, arrNoUserTicket };
    } else {
      return "нету билетов";
    }
  }

  async getReservations() {
    let arr = [];
    const bookings = await BookingModel.find()
      .populate("tour")
      .populate("user")
      .then((p) => (arr = { ...p }))
      .catch((error) => console.log(error));
    if (arr.length === 0) {
      return "Нету забронированных туров";
    }
    return arr;
  }

  async getUsers() {
    const users = await UserModel.find();
    return users;
  }
}

module.exports = new TourService();

/*
const rrr = async (file) => {
  let doc = new PDFDocument();
  doc
    .image("C:/Users/admin/Desktop/diplom/server/assets/logo.jpg", 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text("Travel Compony", 110, 57)
    .fontSize(10)
    .text("123 Main Street", 200, 65, { align: "right" })
    .text("New York, NY, 10025", 200, 80, { align: "right" })
    .moveDown();
  doc.end();
  doc.pipe(fs.createWriteStream(file));
};*/
