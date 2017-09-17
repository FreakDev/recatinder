import React, { Component } from 'react'
import './css/Draggable.css'

export const SWIPE_DETECTION_LIMIT = 100

const INITIAL_STATE = {
    dragging: false,
    diffX: 0,
    diffY: 0,
    animate: false,
}

class Draggable extends Component {

    constructor(props) {
        super(props)

        this._startingPoint = null //{ x: val, y: val }
        this._screenHalf = 0
        
        this._onResize = this._onResize.bind(this)
        this._onTouchMove = this._onTouchMove.bind(this)
        this._onTouchEnd = this._onTouchEnd.bind(this)
    }

    state = INITIAL_STATE

    componentDidMount() {
        this._onResize()
        window.addEventListener('resize', this._onResize)
    }

    _onResize() {
        this._screenHalf = Math.floor(window.innerWidth / 2);
    }

    _onTouchMove(e) {
        e.preventDefault();
        let nextState = { dragging: true }
        
        if (!this.state.dragging) {
            this._startingPoint = { x:e.changedTouches[0].pageX, y:e.changedTouches[0].pageY }
            this.props.onSwipeStart && this.props.onSwipeStart()
        }            

        const eventData = {
            diffX: this._startingPoint.x - e.changedTouches[0].pageX,
            diffY: this._startingPoint.y - e.changedTouches[0].pageY,
            event: e
        }

        Object.assign(nextState, eventData)
        this.setState(nextState)
        
        this.props.onDrag(eventData)

    }

    _onTouchEnd(e) {
        if(this.state.dragging) {
            this._startingPoint = null
            const { diffX, diffY, event } = this.state    
            this.setState(Object.assign({}, INITIAL_STATE, {animate: true}))
            setTimeout(() => {
                this.setState({
                    animate: false
                })
            }, 400)
            if (Math.abs(this.state.diffX) > Math.abs(this.state.diffY)) {
                if (this.state.diffX > SWIPE_DETECTION_LIMIT) {
                    this.props.onSwipeLeft && this.props.onSwipeLeft({ diffX, diffY, event })
                } else if (this.state.diffX < -SWIPE_DETECTION_LIMIT) {
                    this.props.onSwipeRight && this.props.onSwipeRight({ diffX, diffY, event })
                } else {
                    this.props.onSwipeCanceled && this.props.onSwipeCanceled()
                }                    
            } else {
                if (this.state.diffY > SWIPE_DETECTION_LIMIT) {
                    this.props.onSwipeUp && this.props.onSwipeUp({ diffX, diffY, event })
                } else if (this.state.diffX < -SWIPE_DETECTION_LIMIT) {
                    this.props.onSwipeDown && this.props.onSwipeDown({ diffX, diffY, event })
                }
                else {
                    this.props.onSwipeCanceled && this.props.onSwipeCanceled()
                }    
            }
        }
    }

    render() {

        let draggableStyles = {}

        let vMarkStyle = {}, hMarkStyles = {}

        if (!this.props.disable) {
            hMarkStyles = {
                opacity: this.state.dragging ? Math.abs(this.state.diffX / SWIPE_DETECTION_LIMIT) : 0
            }
    
            vMarkStyle = {
                opacity: this.state.dragging ? Math.abs(this.state.diffY / SWIPE_DETECTION_LIMIT) : 0            
            }

            draggableStyles = {
                transform: this.state.dragging ? 'translate3d(' + (-this.state.diffX * 1.5) + 'px, ' + (-this.state.diffY * 1.5) + 'px, 0) rotateZ(' + (this.state.diffX / this._screenHalf) * 45 + 'deg)' : 'none',
                transition: this.state.animate ? '0.4s' : 'none'
            }
        }

        return (
            <div className={ 'draggable-frame' + (this.props.className ? ' ' + this.props.className : '') } style={ Object.assign(draggableStyles,this.props.style) } >
                <div className="draggable"
                     onTouchMove={ this._onTouchMove } 
                     onTouchEnd={ this._onTouchEnd } >
                    <div className="content">
                        { React.Children.map(this.props.children, (child) => React.cloneElement(child, { preventTouchEvent: this.state.dragging } )) }
                    </div>
                </div>
                { this.state.dragging ? (Math.abs(this.state.diffX) > Math.abs(this.state.diffY) ? (this.state.diffX < 0 ? 
                        <div className="mark like" style={ hMarkStyles }>LIKE</div>
                        : 
                        <div className="mark nope" style={ hMarkStyles }>NOPE</div>
                    ) : this.state.diffY > 0 ?
                        <div className="mark star" style={ vMarkStyle }>SUPER<br />LIKE</div> 
                        :
                        ''
                    ) :
                 ''
                }
            </div>
        )
    }
}

export default Draggable