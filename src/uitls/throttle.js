export default function(func,wait) {
    let timeout;
    return function(){
        let context = this;
        let args = arguments;
        if(!timeout) {
            timeout = setTimeout(() => {
                timeout = null;
                func.apply(context,args)
            },wait)
        }
    }
}