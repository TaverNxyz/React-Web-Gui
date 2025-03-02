
/**
 * Tracks and manages pending message responses
 */

export interface PendingResponse {
  resolve: (value: any) => void;
  reject: (reason: any) => void;
  timeout: number;
}

export class ResponseTracker {
  private pendingResponses: Map<string, PendingResponse> = new Map();
  
  /**
   * Track a new pending response
   */
  public trackResponse(
    correlationId: string, 
    resolve: (value: any) => void, 
    reject: (reason: any) => void,
    timeoutId: number
  ): void {
    this.pendingResponses.set(correlationId, {
      resolve,
      reject,
      timeout: timeoutId
    });
  }
  
  /**
   * Check if a response is being tracked with the given correlationId
   */
  public hasResponse(correlationId: string): boolean {
    return this.pendingResponses.has(correlationId);
  }
  
  /**
   * Resolve a pending response
   */
  public resolveResponse(correlationId: string, payload: any): void {
    const pendingResponse = this.pendingResponses.get(correlationId);
    if (pendingResponse) {
      clearTimeout(pendingResponse.timeout);
      this.pendingResponses.delete(correlationId);
      pendingResponse.resolve(payload);
    }
  }
  
  /**
   * Reject a pending response
   */
  public rejectResponse(correlationId: string, error: any): void {
    const pendingResponse = this.pendingResponses.get(correlationId);
    if (pendingResponse) {
      clearTimeout(pendingResponse.timeout);
      this.pendingResponses.delete(correlationId);
      pendingResponse.reject(error);
    }
  }
}

export default ResponseTracker;
