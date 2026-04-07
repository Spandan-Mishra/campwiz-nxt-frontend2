import LoadingSVG from "@/public/logo-animated.svg";
const LoadingPopup = ({ src = LoadingSVG }: { src?: string, message?: string }) => (
    <div className="loading-popup fixed top-0 left-0 w-full h-full bg-transparent z-50 flex items-center justify-center flex-col backdrop-blur-[2px]">
        <img src={src} alt="Loading" width={100} height={100} />
    </div>
)
export default LoadingPopup;
