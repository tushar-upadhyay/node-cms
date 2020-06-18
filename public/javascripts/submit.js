function handle_submit(){
    const data = inscrybmde.markdown(inscrybmde.value())
    const title = document.getElementById('title').value;
    const subHeading = document.getElementById('subHeading').value;
    const imageUrl = document.getElementById('imageUrl').value;
    fetch('/tutorials/addPost',{
        method:'POST',
        headers:{
           "Content-Type": "application/json"
        },
        body:JSON.stringify({
            body:data,
            title,
            subHeading,
            imageUrl,
            author:'Tushar Upadhyay'
        })
    }).then(res=>window.location.replace('/tutorials')).catch(err=>console.log(err));
}