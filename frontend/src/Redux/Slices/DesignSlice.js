// src/Redux/Slices/DesignSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DesignApi from "../API/DesignsApi";

// ✅ Thunk for adding a lace
export const addLace = createAsyncThunk(
  "design/addLace",
  async (laceData, { rejectWithValue }) => {
    try {
      const response = await DesignApi.AddLace(laceData);
      message.success(response.data.message || " added successfully");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ Thunk for getting all laces
export const getLaces = createAsyncThunk(
  "design/getLaces",
  async (_, { rejectWithValue }) => {
    try {
      const response = await DesignApi.GetLace();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ Thunk for updating a lace
export const updateLace = createAsyncThunk(
  "design/updateLace",
  async ({ id, laceData }, { rejectWithValue }) => {
    try {
      const response = await DesignApi.updateLace(id, laceData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ Thunk for deleting a lace
export const deleteLace = createAsyncThunk(
  "design/deleteLace",
  async (id, { rejectWithValue }) => {
    try {
      await DesignApi.deleteLace(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ------------------- 👗 BLOUSES -------------------

// ➕ Add Blouse
// src/Redux/Slices/DesignSlice.js
export const addBlouse = createAsyncThunk(
  "design/addBlouse",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await DesignApi.AddBlouse(formData);
      message.success(response.data.message || "Blouse added successfully");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


// 📥 Get All Blouses
export const getBlouses = createAsyncThunk(
  "design/getBlouses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await DesignApi.GetBlouse();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✏️ Update Blouse
export const updateBlouse = createAsyncThunk(
  "design/updateBlouse",
  async ({ id, blouseData }, { rejectWithValue }) => {
    try {
      const response = await DesignApi.EditBlouse(id, blouseData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ❌ Delete Blouse
export const deleteBlouse = createAsyncThunk(
  "design/deleteBlouse",
  async (id, { rejectWithValue }) => {
    try {
      await DesignApi.deleteBlouse(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ------------------- SLICE -------------------

const DesignSlice = createSlice({
  name: "design",
  initialState: {
    laces: [],
    blouses: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetDesignState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // ------------------- LACE -------------------
      .addCase(addLace.pending, (state) => {
        state.loading = true;
      })
      .addCase(addLace.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.laces.push(action.payload);
      })
      .addCase(addLace.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getLaces.fulfilled, (state, action) => {
        state.loading = false;
        state.laces = action.payload;
      })

      .addCase(updateLace.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.laces.findIndex((lace) => lace.id === action.payload.id);
        if (index !== -1) state.laces[index] = action.payload;
      })

      .addCase(deleteLace.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.laces = state.laces.filter((lace) => lace.id !== action.payload);
      })

            // ------------------- BLOUSE -------------------
      // ➕ Add Blouse
      .addCase(addBlouse.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addBlouse.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.blouses.push(action.payload);
      })
      .addCase(addBlouse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // 📥 Get Blouses
      .addCase(getBlouses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBlouses.fulfilled, (state, action) => {
        state.loading = false;
        state.blouses = action.payload;
      })
      .addCase(getBlouses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✏️ Update Blouse
      .addCase(updateBlouse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlouse.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.blouses.findIndex(
          (b) => b.id === action.payload.id || b._id === action.payload._id
        );
        if (index !== -1) {
          state.blouses[index] = action.payload;
        }
      })
      .addCase(updateBlouse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ❌ Delete Blouse
      .addCase(deleteBlouse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlouse.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.blouses = state.blouses.filter(
          (b) => b.id !== action.payload && b._id !== action.payload
        );
      })
      .addCase(deleteBlouse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

export const { resetDesignState } = DesignSlice.actions;
export default DesignSlice.reducer;
