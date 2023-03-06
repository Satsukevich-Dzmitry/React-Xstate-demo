type Props = {
  goodWheels: number;
  brokenWheels: number;
  wheelColor: string;
};

export const Statistics = ({ goodWheels, brokenWheels, wheelColor }: Props) => (
  <div>
    <h2>Stats</h2>
    <p>Good wheels: {goodWheels}</p>
    <p>Broken wheels: {brokenWheels}</p>
    <p>Currently working on {wheelColor} wheel</p>
  </div>
);
