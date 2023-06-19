const tourService = require("../../service/tour/tourService");
const decrypted = require("../../crypto/cryptography");
const mailService = require("../../service/mail/mailService");
const { json } = require("body-parser");

class TourController {
  async getTours(req, res, next) {
    try {
      const arrTours = await tourService.getAllTours();
      res.json(arrTours);
    } catch (e) {
      console.log(e);
      next();
    }
  }

  async createTour(req, res, next) {
    try {
      const { name, type, date, country, city, price, duration, linkPhoto } = req.body;
      //nsole.log(name, type, date, country, city, price, duration, linkPhoto);
      const ss = await tourService.createTour(
        name,
        type,
        date,
        country,
        city,
        price,
        duration,
        linkPhoto
      );
      res.json({ elem: "add db " });
    } catch (e) {
      next();
    }
  }

  async removeTour(req, res, next) {
    try {
      //const {tourId} = req.body;
      const removedTour = await tourService.delete(req.params.id);
      console.log("tur delete = ", removedTour);
      res.json({ removedTour });
    } catch (e) {
      res.json({ removedTour: "tour do not deleted" });
    }
  }

  async validateCardId(req, res, next) {
    try {
      const { email } = req.body;
      // console.log(email.email);
      const Id = await tourService.validateIdCard(email.email);
      if (!Id) {
        Id = "error";
      }

      res.json({ Code: "код потверждения отправлен на почту" });
      //res.json({ Code: Id });
    } catch (e) {
      next();
    }
  }

  async buyTour(req, res, next) {
    try {
      const { clientInfoBooking } = req.body;

      //console.log(clientInfoBooking);
      const buyTourData = await tourService.buyTour(
        JSON.parse(decrypted(clientInfoBooking))
      );
      // const email = "";
      // const fileName = "vfvf";
      // const dirName =
      //   "C:/Users/admin/Desktop/diplom/server/pdf/" + fileNme + ".pdf";
      //mailService.sendTicket(dirName, fileName, email);
      res.json({ elem: buyTourData });
    } catch (e) {
      next();
    }
  }

  async bookingTour(req, res, next) {
    try {
      const { objectBooking } = req.body;
      const bookingTourData = await tourService.reservationTour(
        JSON.parse(decrypted(objectBooking))
      );

      res.json(bookingTourData);
    } catch (e) {
      next();
    }
  }

  async getBookingTour(req, res, next) {
    try {
      const user = JSON.parse(req.params.id);
      console.log("94: ", user);
      const getBookings = await tourService.getReservationTour(user);
      //console.log("96: ", getBookings);

      //  console.log("98: ", getBookings[0].customers);

      return res.json(getBookings);
      //return res.json({ elem: "vse" });
    } catch (e) {
      next();
    }
  }

  async buyTourValidationUser(req, res, next) {
    try {
      const { bookingInfoUser } = req.body;
      const payTour = await tourService.buyTourValidUser(
        JSON.parse(decrypted(bookingInfoUser))
      );
      res.json(payTour);
    } catch (e) {
      res.json({ elem: "не получилось купить забронированный тур" });
      next();
    }
  }

  async cancelTour(req, res, next) {
    try {
      const { cancelTourObj } = req.body;
      const cancel = await tourService.cancelBookingTour(cancelTourObj);
      console.log("cancel ", cancel);
      res.json(cancel);
    } catch (e) {
      res.json({ elem: "не получилось отменить тур" });
      next();
    }
  }

  async getTicketValidUser(req, res, next) {
    try {
      const ticketInfoUser = JSON.parse(req.params.id);
      const ticket = await tourService.getValidUserTicket(ticketInfoUser);
      res.json(ticket);
    } catch (e) {
      res.json({ elem: "не получилось взять билеты" });
      next();
    }
  }

  async getTickets(req, res, next) {
    try {
      const tickets = await tourService.getTickets();
      res.json(tickets);
    } catch (e) {
      next();
    }
  }

  async getReservations(req, res, next) {
    try {
      const reservations = await tourService.getReservations();
      res.json(reservations);
    } catch (e) {
      next();
    }
  }
  async getUsers(req, res, next) {
    try {
      const users = await tourService.getUsers();
      res.json(users);
    } catch (e) {
      next();
    }
  }
}

module.exports = new TourController();
