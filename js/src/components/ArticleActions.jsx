import React, { PropTypes } from 'react'
import { connect }          from 'react-redux'
import { updateArticle }    from '../actions/articles'

class ArticleActions extends React.Component {
	constructor( props ) {
		super( props )
		this.state = {
			unread: false,
			marked: false
		}
	}

	handleClickAction( action ) {
		const { article, dispatch } = this.props

		this.setState({ [ action]: ! this.state[ action ] } )
		dispatch( updateArticle( article.id, action, 2 ) )
	}

	updateState( props ) {
		const { unread, marked } = props.article

		this.setState({
			unread: unread,
			marked: marked
		})
	}

	componentWillMount() {
		this.updateState( this.props )
	}

	componentWillReceiveProps( nextProps ) {
		this.updateState( nextProps )
	}

	render() {
		const { unread, marked } = this.state

		let starTitle = marked ? 'Unstar' : 'Star'
		let starIcon  = marked ? 'fa-star' : 'fa-star-empty'

		let readTitle = unread ? 'Mark as read' : 'Mark as unread'
		let readIcon  = unread ? 'fa-check-empty' : 'fa-check'

		return (
			<div className="actions">
				<a onClick={ () => { this.handleClickAction( 'unread' ) } } title={ readTitle } className={ readIcon } />
				<a onClick={ () => { this.handleClickAction( 'marked' ) } } title={ starTitle } className={ starIcon } />
			</div>
		)
	}
}

ArticleActions.propTypes = {
	article:  PropTypes.object.isRequired,
	dispatch: PropTypes.func.isRequired
}

export default connect()( ArticleActions )
