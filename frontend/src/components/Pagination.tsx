 // Define the Props type correctly
export type Props = {
    page: number;
    pages: number;
    onPageChange: (page: number) => void;
};

// Use the correct type for the props in the Pagination component
const Pagination = ({ page, pages, onPageChange }: Props) => {
    const pageNumber = [];
    for (let i = 1; i <= pages; i++) {
        pageNumber.push(i);
    }

    // Add your JSX for rendering the pagination component
    return (
        <div className="flex justify-center">
            <ul className="flex border border-slate-300">
                {pageNumber.map(( number)=>(
                    <li className={`px-2 py-1 ${page === number?"bg-gray-200":""}`}>
                               <button onClick={()=>onPageChange(number)}>{number}</button>
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default Pagination;
