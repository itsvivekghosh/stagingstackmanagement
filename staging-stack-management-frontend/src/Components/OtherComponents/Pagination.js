/* eslint-disable */ 
import React, { Component } from 'react'

export class Pagination extends Component {

    render() {
        const { postsPerPage, totalPosts, paginate } = this.props;
        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); ++i) {
            pageNumbers.push(i);
        }

        return (
            <div className="pagination">
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        {
                            pageNumbers.map(pageNumber => (
                                <li className="page-item" key={pageNumber}>
                                    <a href="#" className="page-link" onClick={() => paginate(pageNumber)}>{pageNumber}</a>
                                </li>
                            ))
                        }
                    </ul>
                </nav>
            </div>
        )
    }
}
export default Pagination;