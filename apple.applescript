-- Simulate a mouse click at coordinates (x, y)
on simulateMouseClick(x, y)
	tell application "System Events"
		-- Move the mouse cursor to the specified coordinates
		do shell script "/usr/bin/env python -c 'from Quartz.CoreGraphics import CGEventCreateMouseEvent, kCGEventMouseMoved, kCGEventLeftMouseDown, kCGEventLeftMouseUp, kCGEventMouseMoved, kCGEventRightMouseDown, kCGEventRightMouseUp, kCGEventRightMouseDragged, kCGEventLeftMouseDragged, CGEventPost, kCGEventMouseMoved, kCGEventLeftMouseDown, kCGEventLeftMouseUp, kCGEventMouseMoved, kCGEventRightMouseDown, kCGEventRightMouseUp, kCGEventRightMouseDragged, kCGEventLeftMouseDragged, kCGEventRightMouseDown, kCGEventRightMouseUp, kCGEventRightMouseDragged; e = CGEventCreateMouseEvent(None, kCGEventMouseMoved, (" + x + ", " + y + "), 0); CGEventPost(0, e);'"
		
		-- Simulate a left mouse click
		do shell script "/usr/bin/env python -c 'from Quartz.CoreGraphics import CGEventCreateMouseEvent, kCGEventMouseMoved, kCGEventLeftMouseDown, kCGEventLeftMouseUp, CGEventPost, kCGEventMouseMoved, kCGEventLeftMouseDown, kCGEventLeftMouseUp; e = CGEventCreateMouseEvent(None, kCGEventMouseMoved, (" + x + ", " + y + "), 0); CGEventPost(0, e); e = CGEventCreateMouseEvent(None, kCGEventLeftMouseDown, (" + x + ", " + y + "), 0); CGEventPost(0, e); e = CGEventCreateMouseEvent(None, kCGEventLeftMouseUp, (" + x + ", " + y + "), 0); CGEventPost(0, e);'"
	end tell
end simulateMouseClick

-- Example usage: simulate mouse click at coordinates (100, 200)
simulateMouseClick(100, 200)
