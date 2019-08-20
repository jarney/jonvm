
/**
 * This object represents the virtual machine.
 */
function JVM() {
    var obj = this;
    
    obj.stack = new JVMStack();
    obj.heap = new JVMHeap();
    obj.methodArea = new JVMMethod();
    obj.localVariables = new JVMLocalVariables();
    
    obj.initialize = function() {
        
    };
    
    return obj;
}

function JVMLocalVariables() {
    var obj = this;

    obj.localTable = {};
    
    obj.setInteger = function(index, value) {
        localTable[index] = value;
    };
    obj.getInteger = function(index) {
        return localTable[index];
    };
    
    
    return obj;
}

function JVMStack() {
    var obj = this;
    
    obj.pc = 0;
    
    obj.stack = [];
    
    obj.pushInteger = function(integer) {
        obj.stack.push(integer);
    };
    obj.popInteger = function() {
        return obj.stack.pop();
    };
    
    
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

function JVMOpcodes() {
    var obj = this;
    
    obj.table = {};
    
    obj._addOpcode = function(opcode){
        obj.table[opcode.opcode] = opcode;
    };
    obj.addOpcode = function(name, opcode, length) {
        obj._addOpcode(new JVMInstruction(name, opcode, length));
    };
    
    return obj;
}

var opcodeTable = new JVMOpcodes();
opcodeTable.addOpcode("ILOAD", 21, 2, _iload_function);
opcodeTable.addOpcode("ISTORE", 54, 2, _istore_function);
opcodeTable.addOpcode("IADD", 96, 1, _iadd_function);
opcodeTable.addOpcode("IFEQ", 53, 3, _ifeq_function);

function _iload_function(vm, instruction, opcodeArguments) {
    var index = opcodeArguments[1];
    
    var value = vm.localVariables.getInteger(index);
    vm.stack.pushInteger(value);
    
    vm.stack.pc = vm.stack.pc + instruction.length;
    
}

function _istore_function(vm, instruction, opcodeArguments) {
    var index = opcodeArguments[1];
    
    var value = vm.stack.popInteger();
    vm.localVariables.setInteger(index, value);
    
    vm.stack.pc = vm.stack.pc + instruction.length;
    
}
function _iadd_function(vm, instruction, opcodeArguments) {
    
    var value1 = vm.stack.popInteger();
    var value2 = vm.stack.popInteger();
    
    var sum = value1 + value2;
    
    vm.stack.pushInteger(sum);
    
    vm.stack.pc = vm.stack.pc + instruction.length;
}
function _ifeq_function(vm, instruction, opcodeArguments) {

    var value = vm.stack.popInteger();
    if (value === 0) {
        var branchbyte1 = opcodeArguments[1];
        var branchbyte2 = opcodeArguments[2];
        var jumpOffset = (branchbyte1 << 8) | (branchbyte2);
        var jumpAddress = vm.stack.pc + jumpOffset;
        vm.stack.pc = jumpAddress;
    }
    else {
        vm.stack.pc = vm.stack.pc + instruction.length;
    }
    
}

function JVMInstruction(name, opcode, length, executionFunction) {
    var obj = this;
    
    obj.name = name;
    obj.opcode = opcode;
    obj.length = length;
    obj.execute = executionFunction;
    
    return obj;
}


