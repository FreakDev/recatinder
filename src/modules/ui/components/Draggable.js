import React, { Component } from 'react'
import './css/Draggable.css'

export const SWIPE_DETECTION_LIMIT = 100

class Draggable extends Component {

    constructor(props) {
        super(props)

        this._startingPoint = null //{ x: val, y: val }
        this._screenHalf = 0
        
        this._onResize = this._onResize.bind(this)
        this._onTouchMove = this._onTouchMove.bind(this)
        this._onTouchEnd = this._onTouchEnd.bind(this)
    }

    state = {
        dragging: false,
        diffX: 0,
        diffY: 0
    }

    componentDidMount() {
        this._onResize()
        window.addEventListener('resize', this._onResize)
    }

    _onResize() {
        this._screenHalf = Math.floor(window.innerWidth / 2);
    }

    _onTouchMove(e) {
        e.preventDefault();
        if (!this.props.disable) {
            if (!this.state.dragging) {
                this._startingPoint = { x:e.changedTouches[0].pageX, y:e.changedTouches[0].pageY }
                this.props.onSwipeStart && this.props.onSwipeStart()            
            }
            this.setState({
                dragging: true, 
                diffX: this._startingPoint.x - e.changedTouches[0].pageX,
                diffY: this._startingPoint.y - e.changedTouches[0].pageY
            })
            this.props.onDrag({ distance: Math.sqrt(Math.pow(this.state.diffX, 2) + Math.pow(this.state.diffY, 2)) })
        }
    }

    _onTouchEnd(e) {
        if(this.state.dragging) {
            this._startingPoint = null
            this.setState({
                dragging: false,
                animate: true
            })
            setTimeout(() => {
                this.setState({
                    animate: false
                })
            }, 400)
            if (this.state.diffX > SWIPE_DETECTION_LIMIT) {
                this.props.onSwipeRight && this.props.onSwipeRight(Object.assign({}, this.state))
            } else if (this.state.diffX < -SWIPE_DETECTION_LIMIT) {
                this.props.onSwipeLeft && this.props.onSwipeLeft(Object.assign({}, this.state))
            } else {
                this.props.onSwipeCanceled && this.props.onSwipeCanceled()
            }
        }
    }

    render() {

        const draggableStyles = Object.assign({
            transform: this.state.dragging ? 'translate3d(' + (-this.state.diffX * 1.5) + 'px, ' + (-this.state.diffY * 1.5) + 'px, 0) rotateZ(' + (this.state.diffX / this._screenHalf) * 45 + 'deg)' : 'none',
            transition: this.state.animate ? '0.4s' : 'none'
        })

        const markStyles = {
            opacity: this.state.dragging ? Math.abs(this.state.diffX / SWIPE_DETECTION_LIMIT) : 0
        }

        return (
            <div className="draggable-frame" style={ Object.assign(draggableStyles,this.props.style) } >
                <div className="draggable"
                     onTouchMove={ this._onTouchMove } 
                     onTouchEnd={ this._onTouchEnd } >
                    <div className="content">
                        { React.Children.map(this.props.children, (child) => React.cloneElement(child, { preventTouchEvent: this.state.dragging } )) }
                    </div>
                </div>
                { this.state.dragging ? this.state.diffX < 0 ? 
                    <div className="mark like" style={ markStyles }>LIKE</div>
                    : 
                    <div className="mark nope" style={ markStyles }>NOPE</div>
                 :
                 ''
                }
            </div>
        )
    }
}

export default Draggable