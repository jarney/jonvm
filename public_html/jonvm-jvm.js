
/**
 * This object represents the virtual machine.
 */
function JVM() {
    var obj = this;
    
    obj.stack = new JVMStack();
    obj.heap = new JVMHeap();
    obj.methodArea = new JVMMethod();
    
    
    obj.initialize = function() {
        
    };
    
    return obj;
}


function JVMStack() {
    var obj = this;
    
    obj.pc = 0;
    
    return obj;
}

function JVMHeap() {
    var obj = this;
    return obj;
}

function JVMMethod() {
    var obj = this;
    return obj;
}
