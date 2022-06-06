import {getRootEditorStore} from '@codeimage/store/editor/createEditors';
import {terminal$} from '@codeimage/store/terminal';
import {Box, Group, RadioBlock} from '@codeimage/ui';
import {AVAILABLE_TERMINAL_THEMES} from '@core/configuration/terminal-themes';
import {fromObservableObject} from '@core/hooks/from-observable-object';
import {For, JSXElement} from 'solid-js';
import {Dynamic} from 'solid-js/web';

interface TerminalControlFieldProps {
  selectedTerminal: string;
  onTerminalChange: (type: string) => void;
}

export function TerminalControlField(
  props: TerminalControlFieldProps,
): JSXElement {
  const terminalThemes = AVAILABLE_TERMINAL_THEMES;
  const terminalState = fromObservableObject(terminal$);
  const {options} = getRootEditorStore();

  return (
    <Group orientation={'vertical'}>
      <For each={Object.values(terminalThemes.entries)}>
        {terminal => (
          <RadioBlock
            selected={terminal.name === props.selectedTerminal}
            value={terminal.name}
            onSelect={props.onTerminalChange}
          >
            <Box padding={2} width={'100%'}>
              <Dynamic
                showTab={false}
                shadow={'none'}
                tabName={'Untitled'}
                component={terminal.component}
                textColor={terminalState.textColor}
                background={terminalState.background}
                darkMode={terminalState.darkMode}
                accentVisible={true}
                readonlyTab={true}
                showHeader={true}
                showWatermark={false}
                alternativeTheme={false}
                opacity={100}
                themeId={options.themeId}
                showGlassReflection={terminalState.showGlassReflection}
              />
            </Box>
          </RadioBlock>
        )}
      </For>
    </Group>
  );
}
