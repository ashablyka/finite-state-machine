class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.initial = config.initial;
        this.states = config.states;
        this.active = config.initial;
        this.history = [config.initial];
        this.undoBuffer = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.active;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (!(this.states.hasOwnProperty(state))) throw new Error;
        this.active = state;
        this.history.push(state);
        this.undoBuffer = [];
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        this.transition = this.states[this.active].transitions[event];
        this.changeState(this.transition);
        //this.history.push(this.transition);
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.active = this.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let result = [];
        if (event) {
            for (let state in this.states) {
                if (this.states[state].transitions.hasOwnProperty(event)) {
                    result.push(state);
                }
            }
            return result;
        } else return Object.keys(this.states);
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.history.length - 1) {
            this.active = this.history[this.history.length - 2];
            this.undoBuffer.push(this.history.pop());
            return true;
        } else return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.undoBuffer.length) {
            this.active = this.undoBuffer[this.undoBuffer.length - 1];
            this.history.push(this.undoBuffer.pop());
            return true
        } else return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.history = [this.initial];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
