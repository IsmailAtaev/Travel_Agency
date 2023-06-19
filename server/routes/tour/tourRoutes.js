const Router = require("express");
const controller = require("./tourController");

const router = new Router();

router.post("/create", controller.createTour);
router.get("/tour", controller.getTours);
router.delete("/remove/:id", controller.removeTour);
router.post("/api/buy/tour", controller.buyTour);
router.post("/api/buy/validate", controller.validateCardId);
router.post("/api/booking/tour", controller.bookingTour);
router.get("/api/get/booking/tour/:id", controller.getBookingTour);
router.post("/api/pay/booking/tour/user", controller.buyTourValidationUser);
router.post("/api/cancel/booking/tour/user", controller.cancelTour);
router.get("/api/get/ticket/valid/user/:id", controller.getTicketValidUser);

router.get("/api/get/tickets", controller.getTickets);
router.get("/api/get/reservations", controller.getReservations);
router.get("/api/get/users", controller.getUsers);

module.exports = router;
