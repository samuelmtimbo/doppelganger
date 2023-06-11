// Compile instructions:
//
// gcc -o click click.c -Wall -framework ApplicationServices

#include <ApplicationServices/ApplicationServices.h>
#include <unistd.h>

int main(int argc, char *argv[])
{
  int x = 0, y = 0, n = 1;
  float duration = 0.1;

  if (argc < 3)
  {
    printf("USAGE: click X Y [N] [DURATION]\n");
    exit(1);
  }

  x = atoi(argv[1]);
  y = atoi(argv[2]);

  if (argc >= 4)
  {
    n = atoi(argv[3]);
  }

  if (argc >= 5)
  {
    duration = atof(argv[4]);
  }

  CGEventRef click_down = CGEventCreateMouseEvent(
      NULL, kCGEventLeftMouseDown,
      CGPointMake(x, y),
      kCGMouseButtonLeft);

  CGEventRef click_up = CGEventCreateMouseEvent(
      NULL, kCGEventLeftMouseUp,
      CGPointMake(x, y),
      kCGMouseButtonLeft);

  // Now, execute these events with an interval to make them noticeable
  for (int i = 0; i < n; i++)
  {
    CGEventPost(kCGHIDEventTap, click_down);
    sleep(duration);
    CGEventPost(kCGHIDEventTap, click_up);
    sleep(duration);
  }

  // Release the events
  CFRelease(click_down);
  CFRelease(click_up);

  return 0;
}