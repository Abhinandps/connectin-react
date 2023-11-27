import { RotatingLines } from "react-loader-spinner";

function LoadingSpinner({width='46'}) {
    return (
        <RotatingLines
            strokeColor="grey"
            strokeWidth="2"
            animationDuration="0.75"
            width={width}
            visible={true}
        />
    );
}

export default LoadingSpinner;