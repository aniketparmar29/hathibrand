const Spinner = () => {
    return (
      <svg
        className="animate-spin h-10 w-10 text-white"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm16 0a8 8 0 01-8 8V24c7.627 0 13-5.373 13-12h-4zM12 20a8 8 0 01-8-8h-4c0 6.627 5.373 12 12 12v-4z"
        ></path>
      </svg>
    );
  };
export default Spinner;