const e = React.createElement;

function Car(props)
{
	return e('div', {className: 'card'},
	[
		e('div', {className: 'prop', key: 'div' + Math.random()}, props.car.name),
		e('div', {className: 'prop', key: 'div' + Math.random()}, props.car.price)
	]);
}

class App extends React.Component
{
	state = //Зарезервировано и должно быть записано именно таким образом
	{
		cars:
		[
			{name: 'qwe', price: 100},
			{name: 'asd', price: 200}
		]
	}
	
	RenderCars()
	{
		return this.state.cars.map(car =>
		{
			return e
			(
				Car,
				{
					car: car,
					key: car.name + Math.random() //Warning react.development.js:255 Warning: Each child in a list should have a unique "key" prop. Гласит, что необходимо создать key с уникальным id для более оптимальной работы со списком
				}
			)
		})
	}
	
	render()
	{
		return e
		(
			'div',
			{className: 'app'},
			e
			(
				'div',
				{className: 'list'},
				this.RenderCars()
			)
		);
	}
}

ReactDOM.render(e(App), document.getElementById('root'));