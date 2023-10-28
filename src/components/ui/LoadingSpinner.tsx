import { RotatingLines } from "react-loader-spinner";

function LoadingSpinner() {
    return (
        <RotatingLines
            strokeColor="grey"
            strokeWidth="2"
            animationDuration="0.75"
            width="46"
            visible={true}
        />
    );
}

export default LoadingSpinner;