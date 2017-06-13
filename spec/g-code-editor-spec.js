'use babel';

import GCodeEditor from '../lib/g-code-editor';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('GCodeEditor', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('g-code-editor');
  });

  describe('when the g-code-editor:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.g-code-editor')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'g-code-editor:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.g-code-editor')).toExist();

        let gCodeEditorElement = workspaceElement.querySelector('.g-code-editor');
        expect(gCodeEditorElement).toExist();

        let gCodeEditorPanel = atom.workspace.panelForItem(gCodeEditorElement);
        expect(gCodeEditorPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'g-code-editor:toggle');
        expect(gCodeEditorPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.g-code-editor')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'g-code-editor:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let gCodeEditorElement = workspaceElement.querySelector('.g-code-editor');
        expect(gCodeEditorElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'g-code-editor:toggle');
        expect(gCodeEditorElement).not.toBeVisible();
      });
    });
  });
});
