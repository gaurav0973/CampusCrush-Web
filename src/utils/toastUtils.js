import toast from "react-hot-toast";

const toastUtils = {
  success: (message, options = {}) => {
    return toast.success(message, {
      duration: 3000,
      position: "top-center",
      style: {
        background: "#ECFDF5",
        color: "#065F46",
        borderLeft: "4px solid #10B981",
        padding: "12px 16px",
      },
      ...options,
    });
  },
  error: (message, options = {}) => {
    return toast.error(message, {
      duration: 4000,
      position: "top-center",
      style: {
        background: "#FEF2F2",
        color: "#B91C1C",
        borderLeft: "4px solid #EF4444",
        padding: "12px 16px",
      },
      ...options,
    });
  },

  info: (message, options = {}) => {
    return toast(message, {
      duration: 3000,
      position: "top-center",
      style: {
        background: "#F0F9FF",
        color: "#0369A1",
        borderLeft: "4px solid #38BDF8",
        padding: "12px 16px",
      },
      ...options,
    });
  },

  loading: (message, options = {}) => {
    return toast.loading(message, {
      position: "top-center",
      style: {
        background: "#F5F3FF",
        color: "#5B21B6",
        borderLeft: "4px solid #8B5CF6",
        padding: "12px 16px",
      },
      ...options,
    });
  },

  promise: (promise, messages, options = {}) => {
    return toast.promise(promise, messages, options);
  },

  dismiss: (toastId) => {
    toast.dismiss(toastId);
  },

  dismissAll: () => {
    toast.dismiss();
  },
};

export default toastUtils;
