
/**
 * This class represents the 
 * <a href="https://docs.oracle.com/javase/specs/jvms/se8/html/index.html">Java virtual machine</a>.
 */
function JVM() {
    var obj = this;
    
    obj.stack = new JVMStack();
    obj.heap = new JVMHeap();
    obj.methodArea = new JVMMethod();
    obj.localVariables = new JVMLocalVariables();
    obj.opcodes = new JVMOpcodes();

    obj.initialize = function() {
        obj.opcodes.addOpcode("ILOAD", 21, 2, _iload_function);
        obj.opcodes.addOpcode("ISTORE", 54, 2, _istore_function);
        obj.opcodes.addOpcode("IADD", 96, 1, _iadd_function);
        obj.opcodes.addOpcode("IFEQ", 53, 3, _ifeq_function);
    };
    
    return obj;
}
/**
 * This class represents the
 * <a href="https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-2.html#jvms-2.6.1">Local Variables</a>
 * area of the virtual machine.
 */
function JVMLocalVariables() {
    var obj = this;

    obj.localTable = {};
    /**
     * This method puts an integer 'value'
     * into the local variable register 'index'.
     */
    obj.setInteger = function(index, value) {
        localTable[index] = value;
    };
    /**
     * This method retrieves an integer
     * from the local variable register 'index'.
     */
    obj.getInteger = function(index) {
        return localTable[index];
    };
    
    
    return obj;
}

/**
 * This class represents the
 * <a href="https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-2.html#jvms-2.6.2">Operand Stack</a>
 * area of the virtual machine and also contains the <a href="https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-2.html#jvms-2.5.1">program counter</a>.
 */
function JVMStack() {
    var obj = this;
    
    obj.pc = 0;
    
    obj.stack = [];
    /**
     * This class represents the operation of pushing
     * the integer 'value' onto the operand stack.
     */
    obj.pushInteger = function(value) {
        obj.stack.push(integer);
    };
    /**
     * This class represents the operation of popping
     * an integer from the operand stack and returning
     * it to the caller.
     */
    obj.popInteger = function() {
        return obj.stack.pop();
    };
    
    
    return obj;
}

/**
 * This object represents the
 * <a href="https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-2.html#jvms-2.5.3">Heap</a>
 * of the virtual machine.
 */
function JVMHeap() {
    var obj = this;
    return obj;
}

/**
 * This object represents the
 * <a href="https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-2.html#jvms-2.5.4">Method area</a>
 * for the virtual machine
 * and is intended to hold the bytecode or instructions
 * that the machine will execute.
 */
function JVMMethod() {
    var obj = this;
    return obj;
}

/**
 * This class represents the set of
 * <a href="https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-6.html">all VM instructions</a>
 * and is simply a container for the definitions of each
 * instruction indexed by the opcode byte that identifies
 * that instruction.
 */
function JVMOpcodes() {
    var obj = this;
    
    obj.table = {};
    
    obj.addOpcode = function(name, opcode, length, executionFunction) {
        obj.table[opcode] = new JVMInstruction(name, opcode, length, executionFunction);
    };
    
    return obj;
}

/**
 * This class represents a single instruction
 * in the virtual machine.
 */
function JVMInstruction(name, opcode, length, executionFunction) {
    var obj = this;
    
    obj.name = name;
    obj.opcode = opcode;
    obj.length = length;
    obj.execute = executionFunction;
    
    return obj;
}

/**
 * This function implements the <a href="https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-6.html#jvms-6.5.iload">ILOAD instruction</a>.
 */
function _iload_function(vm, instruction, opcodeArguments) {
    var index = opcodeArguments[1];
    
    var value = vm.localVariables.getInteger(index);
    vm.stack.pushInteger(value);
    
    vm.stack.pc = vm.stack.pc + instruction.length;
    
}
/**
 * This function implements the <a href="https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-6.html#jvms-6.5.istore">ISTORE instruction</a>.
 */
function _istore_function(vm, instruction, opcodeArguments) {
    var index = opcodeArguments[1];
    
    var value = vm.stack.popInteger();
    vm.localVariables.setInteger(index, value);
    
    vm.stack.pc = vm.stack.pc + instruction.length;
    
}
/**
 * This function implements the <a href="https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-6.html#jvms-6.5.iadd">IADD instruction</a>.
 */
function _iadd_function(vm, instruction, opcodeArguments) {
    
    var value1 = vm.stack.popInteger();
    var value2 = vm.stack.popInteger();
    
    var sum = value1 + value2;
    
    vm.stack.pushInteger(sum);
    
    vm.stack.pc = vm.stack.pc + instruction.length;
}

/**
 * This function implements the <a href="https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-6.html#jvms-6.5.if_cond">IFCOND instruction</a>.
 */
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

