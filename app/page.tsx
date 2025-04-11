import Game from "@/components/Game";
import Product from "@/components/Product";

function Cup({ guest }: { guest: number }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* <Game /> */}
      <Product />
    </div>
  );
}
