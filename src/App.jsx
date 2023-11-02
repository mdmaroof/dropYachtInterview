import { useState } from "react";

const CheckSquare = ({ row, col }) => {
  const isDarkSqare = (row + col) % 2 === 1;
  return (
    <div className={`check_square ${(isDarkSqare && "dark") || "light"}`}></div>
  );
};

function App() {
  const [playerOne, setPlayerOne] = useState(true);

  const changePlayer = () => {
    setPlayerOne((prev) => !prev);
  };

  // const arrayOne = [0, 1, 0, 1, 0, 1, 0, 1];
  // const arrayTwo = [1, 0, 1, 0, 1, 0, 1, 0];

  return (
    <div className="h-screen bg-red-200 flex justify-center items-center">
      <div className="flex flex-wrap w-[400px]">
        {Array(8)
          .fill(null)
          .map((z, row) => {
            return (
              <div key={row} className="flex flex-row">
                {Array(8)
                  .fill(null)
                  .map((x, col) => {
                    return (
                      <div
                        className={`flex items-center justify-center w-[50px] h-[50px] ${
                          (row % 2 === col % 2 && "bf-red-500") || "bg-white"
                        }`}
                        key={col}
                      >
                        {/* {(row !== 3 && row !== 4) && row % 2 !== col % 2 && (
                          <div className="w-[40px] h-[40px] bg-black rounded-full"></div>
                        )} */}

                        {(row === 0 || row === 1 || row === 2) &&
                          row % 2 !== col % 2 && (
                            <div className="w-[40px] h-[40px] bg-black rounded-full cursor-pointer"></div>
                          )}
                        {(row === 5 || row === 6 || row === 7) &&
                          row % 2 !== col % 2 && (
                            <div className="w-[40px] h-[40px] bg-blue-700 rounded-full cursor-pointer"></div>
                          )}
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
