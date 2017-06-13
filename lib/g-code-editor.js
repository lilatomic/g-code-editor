'use babel';

import GCodeEditorView from './g-code-editor-view';
import { CompositeDisposable } from 'atom';

export default {

  gCodeEditorView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.gCodeEditorView = new GCodeEditorView(state.gCodeEditorViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.gCodeEditorView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'g-code-editor:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.gCodeEditorView.destroy();
  },

  serialize() {
    return {
      gCodeEditorViewState: this.gCodeEditorView.serialize()
    };
  },

  toggle() {
    console.log('GCodeEditor was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
