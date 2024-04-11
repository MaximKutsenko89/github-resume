import "./index.scss";
export default function LanguageLoader({
  name,
  value,
}: {
  name: string;
  value: number;
}) {
  return (
    <div className="language-progress">
      <div className="language-name ">{name}</div>
      <div
        className="language-progress-bar"
        style={{ width: `${value}%` }}
      ></div>
      <div>{value}%</div>
    </div>
  );
}
