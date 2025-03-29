import type { IPlayerProps } from "@lottiefiles/react-lottie-player";
import { Player as Lottie } from "@lottiefiles/react-lottie-player";

const LOTTIE_PATH_PREFIX = "/static/assets/lotties/";

const LOTTIES = {
  user: `${LOTTIE_PATH_PREFIX}user.json`,
  robotLoading: `${LOTTIE_PATH_PREFIX}robot-loading.json`,
  robotWelcome: `${LOTTIE_PATH_PREFIX}robot-welcome.json`,
  bot: `${LOTTIE_PATH_PREFIX}bot.json`,
} as const;

interface LottiePlayer extends Omit<IPlayerProps, "src"> {
  lottie: keyof typeof LOTTIES;
}

export default function Player({
  lottie,
  loop = true,
  autoplay = true,
  ...props
}: LottiePlayer) {
  return (
    <Lottie src={LOTTIES[lottie]} autoplay={autoplay} loop={loop} {...props} />
  );
}
