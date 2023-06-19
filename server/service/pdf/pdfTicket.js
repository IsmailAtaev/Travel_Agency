const fs = require("fs");
const PDFDocument = require("pdfkit");

/**
 * https://pspdfkit.com/blog/2019/generate-pdf-invoices-pdfkit-nodejs/
 * 
 * https://pdfkit.org/docs/getting_started.html
 * https://pdfkit.org/demo/out.pdf
 * https://github.com/PSPDFKit-labs/pdfkit-invoice/blob/master/index.js
 * 
 * https://www.google.com/search?q=%D0%B0%D0%B2%D0%B8%D0%B0+%D0%B1%D0%B8%D0%BB%D0%B5%D1%82&sxsrf=APwXEdezXFi2Xe1YhFCXiQNlMm4XVZaCaQ:1680871997278&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjn3L2S6Jf-AhVhQkEAHTTCCcMQ_AUoAnoECAEQBA&biw=1536&bih=763&dpr=1.25#imgrc=adDqoXOurzpe5M
 */


/*
function createInvoice(invoice, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  console.log("invoice: ", invoice);
  console.log("path: ", path);
  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}



function generateHeader(doc) {
  doc
    .image("../../assets/logo.jpg", 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text("TRAVEL COMPONY", 110, 57)
    .fontSize(10)
    .text("ACME Inc.", 200, 50, { align: "right" })
    .text("123 Main Street", 200, 65, { align: "right" })
    .text("New York, NY, 10025", 200, 80, { align: "right" })
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  doc.fillColor("#444444").fontSize(20).text("Invoice", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Invoice Number:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(invoice.invoice_nr, 150, customerInformationTop)
    .font("Helvetica")
    .text("Invoice Date:", 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)
    .text("Balance Due:", 50, customerInformationTop + 30)
    .text(
      formatCurrency(invoice.subtotal - invoice.paid),
      150,
      customerInformationTop + 30
    )

    .font("Helvetica-Bold")
    .text(invoice.shipping.name, 300, customerInformationTop)
    .font("Helvetica")
    .text(invoice.shipping.address, 300, customerInformationTop + 15)
    .text(
      invoice.shipping.city +
        ", " +
        invoice.shipping.state +
        ", " +
        invoice.shipping.country,
      300,
      customerInformationTop + 30
    )
    .moveDown();

  generateHr(doc, 252);
}

function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Item",
    "Description",
    "Unit Cost",
    "Quantity",
    "Line Total"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.item,
      item.description,
      formatCurrency(item.amount / item.quantity),
      item.quantity,
      formatCurrency(item.amount)
    );

    generateHr(doc, position + 20);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "Subtotal",
    "",
    formatCurrency(invoice.subtotal)
  );

  const paidToDatePosition = subtotalPosition + 20;
  generateTableRow(
    doc,
    paidToDatePosition,
    "",
    "",
    "Paid To Date",
    "",
    formatCurrency(invoice.paid)
  );

  const duePosition = paidToDatePosition + 25;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    duePosition,
    "",
    "",
    "Balance Due",
    "",
    formatCurrency(invoice.subtotal - invoice.paid)
  );
  doc.font("Helvetica");
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "Payment is due within 15 days. Thank you for your business.",
      50,
      780,
      { align: "center", width: 500 }
    );
}

function generateTableRow(
  doc,
  y,
  item,
  description,
  unitCost,
  quantity,
  lineTotal
) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 150, y)
    .text(unitCost, 280, y, { width: 90, align: "right" })
    .text(quantity, 370, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function formatCurrency(cents) {
  return "$" + (cents / 100).toFixed(2);
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

module.exports = { createInvoice };


*/

const onlineTicket = async (invoice, path) => {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  console.log("invoice: ", invoice);
  console.log("path: ", path);
  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
};

const generateHeader = async (doc) => {
  doc
    .image("C:/Users/admin/Desktop/diplom/server/assets/logo.jpg", 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text("TRAVEL COMPONY", 110, 57)
    .fontSize(10)
    .text("ACME Inc.", 200, 50, { align: "right" })
    .text("123 Main Street", 200, 65, { align: "right" })
    .text("New York, NY, 10025", 200, 80, { align: "right" })
    .moveDown();
};

const generateCustomerInformation = async (doc, invoice) => {
  doc.fillColor("#444444").fontSize(20).text("Tour", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Tour name:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(invoice.invoice_nr, 150, customerInformationTop)
    .font("Helvetica")
    .text("Tour Date:", 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)
    .text("Where:", 50, customerInformationTop + 30)
    .text(
      formatCurrency(invoice.subtotal - invoice.paid),
      150,
      customerInformationTop + 30
    )

    .font("Helvetica-Bold")
    .text(invoice.shipping.name, 300, customerInformationTop)
    .font("Helvetica")
    .text(invoice.shipping.address, 300, customerInformationTop + 15)
    .text(
      invoice.shipping.city +
        ", " +
        invoice.shipping.state +
        ", " +
        invoice.shipping.country,
      300,
      customerInformationTop + 30
    )
    .moveDown();

  generateHr(doc, 252);
};

const generateInvoiceTable = async (doc, invoice) => {
  let i;
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "FI",
    "Passport",
    "Clock",
    "Flight",
    "Unit Cost"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.item,
      item.description,
      item.quantity,
      item.amount
    );

    generateHr(doc, position + 20);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  // generateTableRow(
  //   doc,
  //   subtotalPosition,
  //   "",
  //   "",
  //   "Subtotal",
  //   "",
  //   formatCurrency(invoice.subtotal)
  // );

  const paidToDatePosition = subtotalPosition + 20;
  // generateTableRow(
  //   doc,
  //   paidToDatePosition,
  //   "",
  //   "",
  //   "Paid To Date",
  //   "",
  //   formatCurrency(invoice.paid)
  // );

  const duePosition = paidToDatePosition + 25;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "Price",
    "",
    invoice.paid
  );
  doc.font("Helvetica");
};

const generateFooter = async (doc) => {
  doc
    .fontSize(10)
    .text(
      "+375-(25)-702-12-47",
      50,
      780,
      { align: "center", width: 500 }
    );
};

const generateTableRow = async (
  doc,
  y,
  item,
  description,
  unitCost,
  quantity,
  lineTotal
) => {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 150, y)
    .text(unitCost, 280, y, { width: 90, align: "right" })
    .text(quantity, 370, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
};

const generateHr = async (doc, y) => {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
};

const formatCurrency = async (cents) => {
  return "$" + (cents / 100).toFixed(2);
};

const formatDate = async (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
};

module.exports = { onlineTicket };
