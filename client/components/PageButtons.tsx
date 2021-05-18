export default function PageButtons({ data, page, setPage }) {
  if (data.length < 9 && page === 1) return null; // if we have less than the max number of cards per page and we're on page 1, it means there won't be need for a second page, so the buttons are hidden.
  //  I actually just realized that if the search returns in total 9 items, this setup doesn't work. an alternative could be to request 10, and remove
  // the last one. although this messes up with the pagination, as it's based on the amount of items requested.
  return (
    <div className="center">
      <button
        className="button prev"
        onClick={() => setPage(page + -1)}
        disabled={page === 1 && true} // prev button is disabled if we're on page 1
      >
        Previous page
      </button>
      <button
        className="button next"
        onClick={() => setPage(page + 1)}
        disabled={data.length < 9 && page !== 1} // next button is disabled for the same rule as the buttons display, minus the page number. same reasoning as above.
      >
        Next page
      </button>
    </div>
  );
}
