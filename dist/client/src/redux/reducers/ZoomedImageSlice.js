"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    title: "",
    zoomedpic: "",
    description: "",
    zoom: false,
    discount: 0,
    price: 0,
    category: "",
};
exports.ZoomedImageSlice = toolkit_1.createSlice({
    name: "zoomedImageSlice",
    initialState: initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setZoomedImage(state, action) {
            state.zoomedpic = action.payload.image;
            state.description = action.payload.description;
            state.title = action.payload.title;
            state.discount = action.payload.discount;
            state.price = action.payload.price;
            state.category = action.payload.category;
            state.zoom = true;
        },
        setZoomedImageOut(state) {
            state.zoomedpic = "";
            state.zoom = false;
        },
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: () => { },
});
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
exports.selectZoomedImage = (state) => state.zoomedpic;
exports.selectIfZoomed = (state) => state.zoom;
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
_a = exports.ZoomedImageSlice.actions, exports.setZoomedImage = _a.setZoomedImage, exports.setZoomedImageOut = _a.setZoomedImageOut;
exports.default = exports.ZoomedImageSlice.reducer;
//# sourceMappingURL=ZoomedImageSlice.js.map