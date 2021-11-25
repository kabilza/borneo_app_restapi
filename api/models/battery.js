const mongoose = require('mongoose');

const batterySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: { type: String },
    barcode: { type: String },
    brand: { type: String },
    type: { type: String },
    warrantyPeriod: { type: String },
    dateInstalled: { type: String },
    model: { type: String },
    shopName: { type: String },
    shopProvince: { type: String },
    shopDistrict: { type: String },
    shopPhoneNumber: { type: String },
});

module.exports = mongoose.model('Battery', batterySchema);