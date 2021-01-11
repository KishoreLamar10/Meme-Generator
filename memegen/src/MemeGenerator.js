import React, {Component} from "react"
class MemeGenerator extends Component{
    constructor(){
        super()
        this.state={
            topText:"",
            bottomText:"",
            randomImg:"http://i.imgflip.com/1bij.jpg",
            allMemeImgs:[]
        }
    this.handleChange=this.handleChange.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
    }


    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes")
            .then(response=> response.json())
            .then(response => {
                const {memes} = response.data
                console.log(memes[0])
                this.setState({allMemeImgs: memes})
            })
    
    
    }

    handleChange(event){
        
            const {name,value} = event.target
            this.setState({[name] : value})
    }

     handleSubmit(event){
         event.preventDefault()
         const randInt = Math.floor(Math.random() * this.state.allMemeImgs.length)
         const randImg=this.state.allMemeImgs[randInt].url
         this.setState({randomImg :randImg} )

     }

    render(){
        return(
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input 
                        type="text"
                        name="topText"
                        value={this.state.topText}
                        placeholder="Top Text"
                        onChange={this.handleChange}>
                        
                    </input>
                    
                    <input
                        type="text" 
                        name="bottomText"
                        value={this.state.bottomText}
                        placeholder="Bottom Text"
                        onChange={this.handleChange}>

                        </input>


                    <button>GENERATE</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImg} alt=""></img>
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator