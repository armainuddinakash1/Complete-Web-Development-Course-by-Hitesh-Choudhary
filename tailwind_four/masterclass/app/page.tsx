import Image from "next/image";

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* <div className=" grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 p-4">
                <div className="min-h-[100px] rounded-lg shadow-lg bg-red-500"></div>
                <div className="min-h-[100px] rounded-lg shadow-lg bg-orange-500"></div>
                <div className="min-h-[100px] rounded-lg shadow-lg bg-yellow-500"></div>
                <div className="min-h-[100px] rounded-lg shadow-lg bg-lime-500"></div>
                <div className="min-h-[100px] rounded-lg shadow-lg bg-green-500"></div>
                <div className="min-h-[100px] rounded-lg shadow-lg bg-emerald-500"></div>
            </div> */}
            <div className="min-h-screen grid grid-cols-12 grid-rows-2 gap-4 p-4">
                <div className="md:row-span-2 min-h-lvh rounded-lg shadow-lg bg-red-500 col-span-12 md:col-span-4 xl:col-span-3"></div>
                <div className="xl:row-span-2 min-h-lvh rounded-lg shadow-lg bg-orange-500 col-span-12 md:col-span-8 xl:col-span-6"></div>
                <div className="xl:row-span-2 min-h-lvh rounded-lg shadow-lg bg-yellow-500  col-span-12 md:col-span-8 xl:col-span-3"></div>
            </div>
        </div>
    );
}
