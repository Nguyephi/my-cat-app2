import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { Button, Form } from 'react-bootstrap'

const Cats = [
  { id: 0, name: 'Missy', isAdopted: false, color: 'Tabby', ability: 'Catching mice', img_url: 'https://imgc.artprintimages.com/img/print/tabby-kittens-stanley-and-fosset-6-weeks_u-l-q10oi4u0.jpg?h=550&w=550' },
  { id: 1, name: 'Snowball', isAdopted: true, color: 'White', ability: 'Jumping', img_url: 'https://themepalacedemo.com/pet-business-pro/wp-content/uploads/sites/94/2018/11/kitty-551554_1920.jpg' },
  { id: 2, name: 'Mr. Snuggles', isAdopted: false,  color: 'Black', ability: 'Time travel', img_url: 'https://media.mnn.com/assets/images/2018/02/AdorableBlackCatLookingAtCameraFromSofa.jpg.653x0_q80_crop-smart.jpg' }
]


class Cat extends React.Component {
  render() {
    return (
      <div className='d-flex justify-content-center' style={{ borderBottom: '1px solid lightgrey', marginBottom: 20 }}>
        <li key={this.props.idx} className='list-group d-flex mb-3' style={{ flexDirection: 'row' }}>
          <div style={{ width: '30em', marginRight: 20 }}>
            <strong className='mt-2'>Name: {this.props.name}</strong>
            <p className="list-group-item m-0 d-flex justify-content-center">
              Adopted status: <a onClick={() => this.props.toggleAdoption(this.props.idx)}>{this.props.isAdopted ? <div style={{ color: 'green', paddingLeft: 5 }}>Adopted</div> : <div style={{ color: 'red', paddingLeft: 5 }}>Unadopted</div>}</a>
            </p>
            <p className="list-group-item m-0">
              Color: {this.props.color}
            </p>
            <p className='list-group-item m-0'>
              Special ability: {this.props.ability}
            </p>
          </div>
          <div className='d-flex justify-content-center'>
            <img style={{ width: '200px', height: 200 }} src={this.props.img_url} alt={this.props.name} />
          </div>
        </li>
      </div>
    )
  }
}

class CatForm extends React.Component {
  render() {
    return (
      <div className='d-flex justify-content-center'>
        <Form className="w-25">
            <Form.Control className='mb-2' placeholder='Cat name' type='text' name='name' id='name' value={this.props.name} onChange={this.props.handleInput('name')} />
            <Form.Control className='mb-2' placeholder='Cat color' type='text' name='color' id='color' value={this.props.color} onChange={this.props.handleInput('color')} />
            <Form.Control className='mb-2' placeholder='Cat special ability' type='text' name='ability' id='ability' value={this.props.ability} onChange={this.props.handleInput('ability')} />
            <Form.Control className='mb-2' placeholder='Cat pic (url only)' type='text' name='img_url' id='img_url' value={this.props.img_url} onChange={this.props.handleInput('img_url')} />
            <Button className='mb-4' onClick={(e) => this.props.submitForm(e)}>Submit Cat</Button>
        </Form>
      </div>
    )
  }
}

function SearchCat(props) {
  return (
    <div className='d-flex justify-content-center mt-4'>
      <Form className='w-25'>
        <Form.Control className='mb-2' placeholder='Search Cats' type='text' name='searchCat' id='searchCat' value={props.search} onChange={(e) => props.handleSearch(e)} />
      </Form>
    </div>
  )
}

class CatApp extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    id: 2,
    name: '',
    color: '',
    ability: '',
    img_url: '',
    isAdopted: false,
    searchCat: '',
    cats: Cats
  }
}

  handleSearch = e => {
    e.preventDefault()
    this.setState({ searchCat: e.target.value.substr(0, 20) })
  }

  submitForm = e => {
    e.preventDefault()
    if (this.state.name.length > 0 && this.state.color.length > 0 && this.state.ability.length > 0) {
    Cats.push({ id: this.state.id += 1, name: this.state.name, color: this.state.color, ability: this.state.ability, img_url: this.state.img_url })
    this.setState({ name: '', color: '', ability: '', img_url: '' })
    } else alert('Please fill out the form to submit cat for adoption. Image is not required.')
  }

  handleInput = input => (e) => {
    this.setState({ [input]: e.target.value })
  }

  toggleAdoption = (index) => {
    let catArr = this.state.cats.slice(0)
    catArr.map((cat, idx) => {
      if (index === idx) {
        cat.isAdopted = !cat.isAdopted
      }
    })
    console.log('new arr?', catArr)
    return this.setState({cats: catArr})
    }

  render() {
    let filteredCats = Cats.filter(cat => {
      return cat.name.toLowerCase().indexOf(this.state.searchCat.toLowerCase()) !== -1 || cat.color.toLowerCase().indexOf(this.state.searchCat.toLowerCase()) !== -1 || cat.ability.toLowerCase().indexOf(this.state.searchCat.toLowerCase()) !== -1
    })
    return <div className='text-center'>
      <h1> Welcome to Phil's Cat App</h1>
      <h3> My collection of cute cats</h3>  
      <SearchCat
        handleInput={this.handleInput}
        handleSearch={this.handleSearch}
        {...this.state}
        />
        <h3>Here are my cats:</h3>
      <hr />
      {filteredCats.map((cat, idx) => 
        <ul>
          <Cat
          toggleAdoption={this.toggleAdoption}
          {...cat}
          idx={idx}
          />
      </ul>)}
      <h5 className='mt-5'>Want to add a cat? Fill out the form below.</h5>
      <CatForm
        handleInput={this.handleInput}
        submitForm={this.submitForm}
        {...this.state}
        />
    </div>
  }
}


export default CatApp;
