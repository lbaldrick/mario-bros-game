'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Actor2 = require('./Actor');

var _Actor3 = _interopRequireDefault(_Actor2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Crab = function (_Actor) {
    _inherits(Crab, _Actor);

    function Crab() {
        var _ref;

        _classCallCheck(this, Crab);

        for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
            props[_key] = arguments[_key];
        }

        return _possibleConstructorReturn(this, (_ref = Crab.__proto__ || Object.getPrototypeOf(Crab)).call.apply(_ref, [this].concat(props)));
    }

    return Crab;
}(_Actor3.default);

exports.default = Crab;