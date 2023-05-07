import { ThreeCircles } from 'react-loader-spinner';
import './style.css';

export default function Loader() {

    return (
        <div className="loader-overlay">
            <div className="loader-container">
                <ThreeCircles
                    height="100"
                    width="100"
                    color="#0b1681"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="three-circles-rotating"
                    outerCircleColor=""
                    innerCircleColor=""
                    middleCircleColor=""
                />
            </div>
        </div>
    );

}