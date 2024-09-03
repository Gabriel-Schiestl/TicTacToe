'use client';
import useExecute from "@/hooks/useExecute";
import { IA } from "../Classes/IA";

export default function Home() {
  const { board, handleClick, winner, setBoard, setWinner, IAPoints, playerPoints, setIAPoints, setPlayerPoints } = useExecute();

  return (

    <div className="w-full h-screen flex justify-center items-center">

      <div className='p-2 bg-gray-300 m-10 h-40 flex content-center shadow-sm shadow-black'>

        <div className='flex'>
          <div className='bg-gray-300 border-black border w-32 text-center'>
            <aside className="m-3 row-auto">Player{ }</aside>
            <aside className='m-3 row-auto text-yellow-600 text-lg'>{playerPoints}</aside>
          </div>
          <div className='mx-2 bg-gray-300 border-black border w-32 text-center'>
            <aside className="m-3 row-auto">Inteligência</aside>
            <aside className='m-3 row-auto text-yellow-600 text-lg'>{IAPoints}</aside>
          </div>
        </div>
        <button className="p-5 bg-gray-300 text-black shadow-sm shadow-black hover:bg-black hover:text-yellow-600 text-lg" onClick={() => {
          setBoard(new IA())
          setWinner(null)
          setIAPoints(0),
            setPlayerPoints(0)
        }}>Restart</button>
      </div>
      <div className="grid grid-cols-3 gap-2 w-96 h-96 mt-48">
        {board.board.map((value, index) => (
          <div
            onClick={() => handleClick(index)}
            key={index + 1}
            className="w-full h-full flex justify-center items-center bg-gray-600 text-yellow-600 text-3xl font-bold border border-black cursor-pointer shadow-md shadow-black hover:shadow-sm"
          >
            <p>{value}</p>
          </div>
        ))}
      </div>
      {winner && (
        <div className="absolute bg-white/80 p-4 rounded-lg w-full h-full flex justify-start items-center flex-col">
          <div className="mt-16 flex justify-center items-center flex-col space-y-28">
            <p className={`text-8xl ${winner === 'Você ganhou!' ? "text-yellow-600" : "text-yellow-600"}`}>{winner}</p>
            <button
              className="bg-black text-yellow-600 p-6 rounded-lg"
              onClick={() => {
                setBoard(new IA())
                setWinner(null)
              }}>Jogar novamente</button>
          </div>
        </div>
      )}
    </div>
  );
}
