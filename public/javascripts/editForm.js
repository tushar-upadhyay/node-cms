const title_ = document.getElementById('title');
const subHeading_ = document.getElementById('subHeading');
const imageUrl_ = document.getElementById('imageUrl');
const converter = new showdown.Converter();
const markdown = converter.makeMd(body);
inscrybmde.value(markdown);
title_.value = title;
subHeading_.value = subHeading;
imageUrl_.value = imageUrl;
function handle_edit(){
    const data = inscrybmde.markdown(inscrybmde.value())
    fetch('/tutorials/editPost',{
        method:'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            body:data,
            title:title_.value,
            subHeading:subHeading_.value,
            imageUrl:imageUrl_.value,
            author:'Tushar Upadhyay'
        })
    }).then(res=>window.location.replace('/tutorials')).catch(err=>console.log(err));
}