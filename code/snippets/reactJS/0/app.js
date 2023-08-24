function App(){
	const [formData,setFormData]=React.useState({

	});
	const targetRef=React.useRef([]);
	const handler={
		keyup:function(item){
			var name=this.name;
			var value=this.value;
			var type=this.type;
			if(type=='password')
				value='*'.repeat(value.length);
			setFormData({...formData,[name]:value});
		},
		submit:function(item){
			item.preventDefault();
		}
	};
	
	const autoChange=()=>{
		React.useEffect(()=>{
					let inputs=document.querySelectorAll(".autochange");
					inputs.forEach((item,index)=>{
						item.addEventListener("keyup",handler['keyup']);
					});
					
					return ()=>{
						inputs.forEach((item,index)=>{
							item.removeEventListener("keyup",handler['keyup']);
						});
					};
			
		},[formData]);
	};
	
	return (
		<form name='bla' id='blabla' onSubmit={handler["submit"]}>
			<input className='autochange' required defaultValue={formData.bla1} type='text' name='bla1'/><br/>
			<input className='autochange' required defaultValue={formData.bla2} type='text' name='bla2'/><br/>
			<input className='autochange' required defaultValue={formData.bla3} type='text' name='bla3'/><br/>
			<input className='autochange' required defaultValue={formData.bla4} type='text' name='bla4'/><br/>
			<input className='autochange' required defaultValue={formData.bla5} type='password' name='bla5'/><br/>
			<input type='submit' name='bla4' value='send'/><br/>
			<pre>{JSON.stringify(formData)}</pre>
			<script>
				{autoChange()};
			</script>
		</form>
	);
}
