import * as DropdownMenu from 'zeego/dropdown-menu';
import RoundBtn from './RoundBtn';

export function Dropdown() {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <RoundBtn icon={'ellipse-horizontal'} text="More" />
            </DropdownMenu.Trigger>

            <DropdownMenu.Content>
                <DropdownMenu.Item key="Statement">
                    <DropdownMenu.ItemTitle>Statement</DropdownMenu.ItemTitle>
					
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
}
