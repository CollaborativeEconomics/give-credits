import React from 'react';
import { toast } from '@/components/ui/use-toast';

// This function takes a component and returns a new component
function withToast(Component) {
  return function ToastedComponent(props) {
    return <Component {...props} toast={toast} />;
  };
}

export default withToast;