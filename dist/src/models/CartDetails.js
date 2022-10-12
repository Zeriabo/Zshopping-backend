"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = __importStar(require("sequelize"));
const sequelize_1 = require("../instances/sequelize");
exports.CartDetails = sequelize_1.sequelize.define('cartdetails', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cartId: Sequelize.INTEGER,
    productId: Sequelize.INTEGER,
    quantity: Sequelize.INTEGER,
    price: Sequelize.INTEGER,
    discount: Sequelize.INTEGER,
    createdAt: Sequelize.STRING,
    updatedAt: Sequelize.STRING,
});
//# sourceMappingURL=CartDetails.js.map