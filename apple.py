from Quartz.CoreGraphics import CGEventCreateMouseEvent, kCGEventMouseMoved, kCGEventLeftMouseDown, kCGEventLeftMouseUp, kCGEventMouseMoved, kCGEventRightMouseDown, kCGEventRightMouseUp, kCGEventRightMouseDragged, kCGEventLeftMouseDragged, CGEventPost, kCGEventMouseMoved, kCGEventLeftMouseDown, kCGEventLeftMouseUp, kCGEventMouseMoved, kCGEventRightMouseDown, kCGEventRightMouseUp, kCGEventRightMouseDragged, kCGEventLeftMouseDragged, kCGEventRightMouseDown, kCGEventRightMouseUp, kCGEventRightMouseDragged
e = CGEventCreateMouseEvent(
    None, kCGEventMouseMoved, (" + x + ", " + y + "), 0)
CGEventPost(0, e)
