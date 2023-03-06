import classNames from 'classnames';
import './wheel.css';

export type WheelProps = {
  position: {
    top: number;
    left: number;
  };
  shouldShow: boolean;
  color: string;
  spinsRight: boolean;
  spinsLeft: boolean;
};

export const Wheel = ({ position, shouldShow, color, spinsRight, spinsLeft }: WheelProps) => {
  if (!shouldShow) {
    return <></>;
  }
  return (
    <div
      className={classNames('wheel', {
        'spin-right': spinsRight,
        'spin-left': spinsLeft,
      })}
      style={{ left: `${position.left}px`, top: `${position.top}%`, background: color }}
    >
      TEXT
    </div>
  );
};
