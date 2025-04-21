export const GetSearchResult = ({
  search,
  title,
}: {
  search: string;
  title: string;
}) => {
  if (search.length === 0) return title;

  search = search.toLowerCase();
  const strIdx = title.toLowerCase().indexOf(search);
  if (strIdx !== -1) {
    return (
      <>
        {title.substring(0, strIdx)}
        {<strong>{title.substring(strIdx, strIdx + search.length)}</strong>}
        {title.substring(strIdx + search.length)}
      </>
    );
  } else return <>{title}</>;
};

// if (search.length !== 0)
//   return title.split(" ").map((str, idx) => {
//     const strIdx = str.toLowerCase().indexOf(search);
//     console.log(str + strIdx);
//     if (strIdx !== -1)
//       return (
//         <span key={idx}>
//           {`${idx !== 0 ? " " : ""}`}
//           {str.substring(0, strIdx)}
//           {<strong>{str.substring(strIdx, strIdx + search.length)}</strong>}
//           {str.substring(strIdx + search.length)}
//         </span>
//       );
//     else return <span>{str}</span>;
//   });
// else return title;
