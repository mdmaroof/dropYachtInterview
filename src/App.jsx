import { useEffect, useState } from "react";

const Square = ({
  row,
  col,
  playerOne,
  playerTwo,
  moveSquare,
  squareClick,
  move,
}) => {
  const Pieces = ({ playerOne, squareClick }) => {
    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
          squareClick({ row, col, playerOne, type: "remove" });
        }}
        className={`w-[20px] h-[20px] rounded-full ${
          (playerOne && "bg-blue-500") || "bg-green-500"
        } `}
      />
    );
  };

  return (
    <button
      onClick={() => !!move && squareClick({ row, col, type: "add" })}
      className={`w-[40px] h-[40px] flex items-center justify-center 
      ${(row + col) % 2 === 1 && "bg-red-700"} }
      ${(row + col) % 2 === 0 && "bg-black"} 
      ${
        moveSquare &&
        moveSquare.length > 0 &&
        moveSquare.find((x) => x.row === row && x.col === col) &&
        "bg-gray-300"
      } 

      `}
    >
      {playerOne.map((x) => {
        return (
          <>
            {x.row === row && x.col === col && (
              <Pieces squareClick={squareClick} playerOne />
            )}
          </>
        );
      })}

      {playerTwo.map((x) => {
        return (
          <>
            {x.row === row && x.col === col && (
              <Pieces squareClick={squareClick} playerOne={false} />
            )}
          </>
        );
      })}
    </button>
  );
};
function App() {
  // player one  row 0-7 col 0,1,2
  // player two row 0-7 col 5,6,7

  const [playerOne, setPlayerOne] = useState([]);
  const [playerTwo, setPlayerTwo] = useState([]);

  const [move, setMove] = useState(null);

  const [moveSquare, setMoveSquare] = useState([]);

  const squareClick = (data) => {
    if (!move) {
      setMove(data);
      console.log(data);
      if (data.playerOne) {
        const payload = [
          { row: data.row + 1, col: data.col - 1 },
          { row: data.row - 1, col: data.col - 1 },
        ];

        setMoveSquare(payload)

        // setMoveSquare([{ row: data.row + 1, col: data.col + 1 }]);
        // setMoveSquare(prev = [...prev, { row: data.row - 1, col: data.col + 1 }]);
      }
    }
  };

  console.log(move, moveSquare);

  useEffect(() => {
    Array(8)
      .fill(null)
      .forEach((z, row) => {
        Array(3)
          .fill(null)
          .forEach((x, col) => {
            if ((row + col) % 2 === 1) {
              setPlayerOne((prev) => [...prev, { row, col: col + 5 }]);
            }
          });
      });

    Array(8)
      .fill(null)
      .forEach((z, row) => {
        Array(3)
          .fill(null)
          .forEach((x, col) => {
            if ((row + col) % 2 === 1) {
              setPlayerTwo((prev) => [...prev, { row, col }]);
            }
          });
      });
  }, []);

  console.log(move);

  return (
    <div className="flex h-screen w-full justify-center items-center">
      {Array(8)
        .fill(null)
        .map((z, row) => {
          return (
            <div key={row} className="flex flex-col">
              {Array(8)
                .fill(null)
                .map((x, col) => {
                  return (
                    <Square
                      key={col}
                      row={row}
                      col={col}
                      playerOne={playerOne}
                      playerTwo={playerTwo}
                      move={move}
                      moveSquare={moveSquare}
                      squareClick={squareClick}
                    />
                  );
                })}
            </div>
          );
        })}
    </div>
  );
}

export default App;
