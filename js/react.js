function Car(props)
{
	const classes = ['card']

	if(props.car.marked) classes.push('marked')

	//Из-за автоматической расстановки ; в JS необходимо писать скобку на одной строке
	return (
		<div className={classes.join(' ')} onClick={props.onMark}>
			<div className="prop">
				{props.car.name}
			</div>
			
			<div className="prop">
				{props.car.price}
			</div>
		</div>
	)
}

class App extends React.Component
{
	state = //Хранит состояния компонентов. Зарезервировано и должно быть записано именно таким образом
	{
		cars:
		[
			{marked: false, name: 'qwe', price: 100},
			{marked: false, name: 'asd', price: 200}
		],
		visible: true,
		appTitle: 'Cars applicator'
	}

	handleMarked(name)
	{
		const cars = this.state.cars.concat(); //Создадим копию массива с помощью метода concat, чтобы не мутировать state напрямую, это важно для реакта
		const car = cars.find(c => c.name === name);
		car.marked = !car.marked;
		this.setState({cars}); //Изменяет состояние общего массива cars из локального cars. Так как {cars: cars}, то мы можем сократить до {cars}
	}
	
	RenderCars()
	{
		if(!this.state.visible) return

		//Warning react.development.js:255 Warning: Each child in a list should have a unique "key" prop.
		//Гласит, что необходимо создать key с уникальным id для более оптимальной работы со списком
		return this.state.cars.map(car =>
		{
			return (
				<Car
					car={car}
					key={car.name + Math.random()}
					onMark={this.handleMarked.bind(this, car.name)} //bind передаёт параметры, this необходимо передавать именно так. Второй способ использовать стрелочную функцию
				/>
			)
		})
	}

	toggleHandler()
	{
		this.setState({visible: !this.state.visible})
	}

	titleChaneHandler(title)
	{
		if(title.trim() === '') return;

		this.setState({appTitle: title})
	}
	
	render()
	{
		const style =
		{
			marginRight: 20
		}

		//Из-за автоматической расстановки ; в JS необходимо писать скобку на одной строке
		return (
			<div className="app">
				<h1>{this.state.appTitle}</h1>

				{/*Второй способ вызова функции помимо bind, с помощью стрелочной функции, которая не передаёт свой контекст*/}
				{/*В связи с этим в функции будет нужный нам this текущего класса.*/}
				{/*Так же если задать просто this.toggleHandler(), то функция будет вызвана мгновенно, this так же будет равен текущему классу*/}
				<button
					onClick={() => this.toggleHandler()}
					style={style}
				>Toggle</button>

				<input
					type="text"
					placeholder="Change title"
					onChange={(event) => this.titleChaneHandler(event.target.value)}
					value = {this.state.appTitle}
				/>

				<hr/>

				<div className="list">
					{ this.RenderCars() /*В фигурных скобках пишется JS, а не JSX*. Комментарии на JS будут выводиться как текст в return() */ }
				</div>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'));