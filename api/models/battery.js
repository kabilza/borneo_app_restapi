const mongoose = require('mongoose');

const batterySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: { type: String, required: true },
    barcode: { type: String, required: true },
    brand: { type: String, required: true },
    type: { type: String, required: true },
    warrantyPeriod: { type: String, required: true },
    dateInstalled: { type: String, required: true },
    model: { type: String, required: true },
    shopName: { type: String, required: true },
    shopProvince: { type: String, required: true },
    shopDistrict: { type: String, required: true },
    shopPhoneNumber: { type: String, required: true },
});

module.exports = mongoose.model('Battery', batterySchema);