export const ActButton: React.FC<{text: string}> = ({text}) => {
  return (
    <>
      <button className="px-4 hover:bg-blue-700 transition-colors text-mg font-medium uppercase py-2 bg-sentinel-blue rounded-md text-white">{text}</button>
    </>
  );
};
