import { useState } from "react";
import {
  Card,
  Text,
  Button,
  Group,
  Stack,
  Avatar,
  Anchor,
} from "@mantine/core";
import {
  IconUserPlus,
  IconTrash,
  IconAt,
  IconPhoneCall,
  IconWorld,
  IconStar,
  IconUserMinus,
} from "@tabler/icons-react";

import * as T from './UserCard.types'

export const UserCard = ({
  user,
  onDelete,
}: {
  user: T.User;
  onDelete: (id: number) => void;
}) => {
  // States 
  const [follow, setFollow] = useState(false);
  const { id, name, email, phone, website } = user;
  
  // Functions 
  const onFollow = () => {
    setFollow(true);
  };

  const onUnfollow = () => {
    setFollow(false);
  };

  return (
    <Card shadow="lg" padding="lg" radius="md" p={20} withBorder>
      <Stack align="stretch">
        <Stack align="center">
          <Avatar
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${name}`}
            color="cyan"
            size="120"
          />
          <Group gap={4} align="center" mt={16}>
            <Text size="lg" fw={500}>
              {name}
            </Text>
            {follow && <IconStar size={16} />}
          </Group>
        </Stack>
        <Stack gap={0}>
          <Group align="center" gap={5} mt={5}>
            <IconAt size={16} color="gray" />
            <Anchor
              href={email}
              target="_blank"
              underline="hover"
              c="gray"
            >
              {email}
            </Anchor>
          </Group>
          <Group align="center" gap={5} mt={5}>
            <IconPhoneCall size={16} color="gray" />
            <Anchor
              target="_blank"
              underline="hover"
              c="gray"
            >
              {phone}
            </Anchor>
          </Group>
          <Group align="center" gap={5} mt={5}>
            <IconWorld size={16} color="gray" />
            <Anchor
              href={website}
              target="_blank"
              underline="hover"
              c="gray"
            >
              {website}
            </Anchor>
          </Group>
        </Stack>
        <Group grow>
          {follow ? (
            <Button
              leftSection={<IconUserMinus size={16} />}
              variant="default"
              onClick={onUnfollow}
            >
              Unfollow
            </Button>
          ) : (
            <Button leftSection={<IconUserPlus size={16} />} onClick={onFollow}>
              Follow
            </Button>
          )}
          <Button
            leftSection={<IconTrash size={16} />}
            variant="outline"
            onClick={() => onDelete(id)}
          >
            Delete
          </Button>
        </Group>
      </Stack>
    </Card>
  );
};
